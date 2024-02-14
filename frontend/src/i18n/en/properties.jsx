const t = {
  list: {
    header: "Properties",
    newBtn: "New Property",
    datagrid: {
      id: "ID",
      name: "Name",
      company: "Company",
      date: "Created on",
      dateFormat: "{{val, datetime}}",
      updatedOn: "Updated on",
      updatedOnFormat: "{{val, datetime}}",
      actions: "Actions",
    },
  },
  create: {
    header: "New Property",
    labels: {
      name: "Name",
      geodata: "Geodata",
    },
    errors: {
      requiredName: "Name is required",
      requiredGeodata: "Geodata is required",
    },
    saveBtn: "Save",
    goBackBtn: "Go back",
    createSuccessMsg: "Property created successfully",
    createErrorMsg: "Error creating property",
  },
  details: {
    header: "Property's details",
    labels: {
      name: "Name",
      geodata: "Geodata",
    },
    errors: {
      requiredName: "Name is required",
      requiredGeodata: "Geodata is required",
    },
    saveBtn: "Save",
    goBackBtn: "Go back",
    updateSuccessMsg: "Property updated successfully",
    updateErrorMsg: "Error updating property",
  },
  delete: {
    confirmationMsg: "Delete property data? This cannot be undone.",
    successMsg: "Property deleted successfully",
    goBackBtn: "Go back",
    deleteBtn: "Delete",
  },
  map: {
    header: "Property map",
    goBackBtn: "Go back",
  }
};

export default t;
