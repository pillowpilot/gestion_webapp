from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from django.core.files import File

from .yolov8 import YOLOv8
from .yolov8 import utils as YOLOv8_utils


def public_index(request):
    return HttpResponse("<h1>Public index 2</h1>")


# from django.shortcuts import render
from .models import Image, AnnotatedImages
from .forms import ImageForm
from pathlib import Path
import logging
from django.db import models
from PIL import Image as PILImage
import cv2
import numpy as np

logger = logging.getLogger("django")

LEAVES_MODEL_FILEPATH = (
    Path(__file__).parent / "onnx_models/leaves_disease_detection.onnx"
)
LEAVES_CLASS_NAMES = [
    "healthy-leaf",
    "moscanegra-leaf",
    "moscanegra-defect",
    "fumagina-leaf",
    "canker-leaf",
    "canker-defect",
]

LEAVES_FILENAME_SUFFIX = "leaves"

FRUITS_MODEL_FILEPATH = (
    Path(__file__).parent / "onnx_models/fruits_disease_detection.onnx"
)
FRUITS_CLASS_NAMES = [
    "healthy-fruit",
    "canker-fruit",
    "canker-defect",
    "scab-fruit",
    "scab-defect",
    "blackspot-fruit",
    "blackspot-defect",
    "stem",
]

FRUITS_FILENAME_SUFFIX = "fruits"


def perform_inference(form: ImageForm, model: YOLOv8):
    """Perform inference on the image"""
    image_pil = PILImage.open(form.cleaned_data["image"])
    image_cv2 = cv2.cvtColor(np.array(image_pil), cv2.COLOR_RGB2BGR)
    boxes, scores, class_ids = model(image_cv2)
    
    logger.info(f"boxes: {boxes}")
    logger.info(f"scores: {scores}")

    annotated_image_cv2 = YOLOv8_utils.draw_detections(
        image_cv2, boxes, scores, class_ids
    )
    
    inference_results = {
        "boxes": boxes,
        "scores": scores,
        "class_ids": class_ids,
    }
    return inference_results, annotated_image_cv2


def upload_image(request):
    """Process images uploaded by users"""
    if request.method == "POST":
        form = ImageForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()

            # Get the current instance object to display in the template
            image_model: models.Image = form.instance
            logger.info(f"img_obj: {image_model}")

            def apply_inference_over_image(
                image_model,
                model_filepath: Path,
                class_names: [str],
                output_suffix: str,
            ):
                """Apply inference over the image and stores the annotated image"""
                if model_filepath.exists():
                    YOLOv8_utils.class_names = class_names
                    yolov8_detector = YOLOv8(
                        model_filepath, conf_thres=0.2, iou_thres=0.3
                    )
                    inference_results, annotated_image = perform_inference(
                        form, yolov8_detector
                    )
                    logger.info(f"inference_results: {inference_results}")

                    # return annotated_image

                    original_image_filepath: Path = Path(image_model.image.path)
                    annotated_image_filepath: Path = (
                        original_image_filepath.parent
                        / f"{original_image_filepath.stem}_{output_suffix}{original_image_filepath.suffix}"
                    )
                    cv2.imwrite(
                        str(annotated_image_filepath), annotated_image
                    )

                    return annotated_image_filepath

                else:
                    logger.error(f"Model file {model_filepath} not found")

            leaves_annotated_image_filepath = apply_inference_over_image(
                image_model,
                LEAVES_MODEL_FILEPATH,
                LEAVES_CLASS_NAMES,
                LEAVES_FILENAME_SUFFIX,
            )
            fruits_annotated_image_filepath = apply_inference_over_image(
                image_model,
                FRUITS_MODEL_FILEPATH,
                FRUITS_CLASS_NAMES,
                FRUITS_FILENAME_SUFFIX,
            )

            annotated_images = AnnotatedImages()

            with open(leaves_annotated_image_filepath, 'br') as f:
                data = File(f)
                annotated_images.leaves_annotations.save(leaves_annotated_image_filepath.name, data, True)

            with open(fruits_annotated_image_filepath, 'br') as f:
                data = File(f)
                annotated_images.fruits_annotations.save(fruits_annotated_image_filepath.name, data, True)

            annotated_images.save()
            
            return render(
                request,
                "upload_image.html",
                {
                    "form": form,
                    "img_obj": image_model,
                    "leaves_annotated_image_url": annotated_images.leaves_annotations.url,
                    "fruits_annotated_image_url": annotated_images.fruits_annotations.url,
                },
            )
    else:
        form = ImageForm()
        return render(request, "upload_image.html", {"form": form})
