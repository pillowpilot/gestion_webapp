const t = {
  list: {
    header: "Inferences",
    newBtn: "New Inference",
    datagrid: {
      id: "ID",
      user: "User",
      lot: "Lot",
      date: "Created on",
      dateFormat: "{{val, datetime}}",
      updatedOn: "Updated On",
      updatedOnFormat: "{{val, datetime}}",
      model: "Model",
      taskId: "Task ID",
      coordinates: "Coordinates",
      status: "Status",
      actions: "Actions",
    },
  },
  create: {
    header: "New Inference",
    inferBtn: "Infer",
    goBackBtn: "Go back",
    labels: {
      inferenceModel: "Inference Model",
      lot: "Lot",
      inputImage: "Input Image",
    },
    options: {
      leavesDiseases: "Leaves Diseases",
      fruitsDiseases: "Fruits Diseases",
      treeCounting: "Tree Counting",
    },
    successMsg: "Inference created successfully",
    errorMsg: "Error creating inference",
  },
  details: {
    goBackBtn: "Go back",
    labels: {
      detailsHeader: "Inference Details",
      lot: "Lot",
      model: "Model",
      status: "Status",
      createdOn: "Created On",
      updatedOn: "Updated On",
      previewHeader: "Preview",
    }
  },
  delete: {
    confirmationMsg: "Delete the inference data? This cannot be undone.",
    successMsg: "Inference deleted successfully",
    errorMsg: "Error deleting inference",
    goBackBtn: "Go back",
    deleteBtn: "Delete",
  }
};

export default t;