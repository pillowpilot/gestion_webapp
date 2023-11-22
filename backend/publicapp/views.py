from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse

from .yolov8 import YOLOv8
from .yolov8 import utils as YOLOv8_utils


def public_index(request):
    return HttpResponse("<h1>Public index 2</h1>")


# from django.shortcuts import render
from .forms import ImageForm
from pathlib import Path
import logging
from django.db import models
from PIL import Image
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


def perform_inference(form: ImageForm, model: YOLOv8):
    """Perform inference on the image"""
    image_pil = Image.open(form.cleaned_data["image"])
    image_cv2 = cv2.cvtColor(np.array(image_pil), cv2.COLOR_RGB2BGR)
    boxes, scores, class_ids = model(image_cv2)
    logger.info(f"boxes: {boxes}")
    logger.info(f"scores: {scores}")

    image_with_detections = YOLOv8_utils.draw_detections(
        image_cv2, boxes, scores, class_ids
    )
    inference_results = {
        "boxes": boxes,
        "scores": scores,
        "class_ids": class_ids,
    }
    return inference_results, image_with_detections


def upload_image(request):
    """Process images uploaded by users"""
    if request.method == "POST":
        form = ImageForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()

            def dispatch_model_filepath_and_class_names(request):
                if request.POST["model"] == "leaves":
                    return LEAVES_MODEL_FILEPATH, LEAVES_CLASS_NAMES
                else:
                    return FRUITS_MODEL_FILEPATH, FRUITS_CLASS_NAMES

            model_filepath, class_names = dispatch_model_filepath_and_class_names(request)
            logger.info(f"model_filepath: {model_filepath}")
            logger.info(f"class_names: {class_names}")

            # Get the current instance object to display in the template
            image_model: models.Image = form.instance
            logger.info(f"img_obj: {image_model}")

            # Inference
            if model_filepath.exists():
                YOLOv8_utils.class_names = class_names
                yolov8_detector = YOLOv8(model_filepath, conf_thres=0.2, iou_thres=0.3)
                inference_results, image_with_detections = perform_inference(
                    form, yolov8_detector
                )
                logger.info(f"inference_results: {inference_results}")

                original_image_filepath: Path = Path(image_model.image.path)
                image_with_detections_filepath = original_image_filepath
                cv2.imwrite(str(image_with_detections_filepath), image_with_detections)

            else:
                logger.error(f"Model file {LEAVES_MODEL_FILEPATH} not found")

            return render(
                request, "upload_image.html", {"form": form, "img_obj": image_model}
            )
    else:
        form = ImageForm()
        return render(request, "upload_image.html", {"form": form})
