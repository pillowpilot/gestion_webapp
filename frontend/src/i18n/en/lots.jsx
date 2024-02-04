const t = {
  list: {
    header: "Lots",
    newBtn: "New Lot",
    datagrid: {
      id: "ID",
      name: "Name",
      property: "Property",
      date: "Date",
      dateFormat: "{{val, datetime}}",
      actions: "Actions",
    },
  },
  create: {
    header: "New Lot",
    labels: {
      name: "Name",
      property: "Property",
    },
    errors: {
      requiredName: "Name is required",
      requiredProperty: "Property is required",
      noPropertiesMsg: "No properties found",
    },
    saveBtn: "Save",
    goBackBtn: "Go back",
    createSuccessMsg: "Lot created successfully",
    createErrorMsg: "Error creating lot",
  },
  details: {
    header: "Lot's details",
    labels: {
      name: "Name",
      property: "Property",
    },
    errors: {
      requiredName: "Name is required",
      requiredProperty: "Property is required",
    },
    saveBtn: "Save",
    goBackBtn: "Go back",
    updateSuccessMsg: "Lot updated successfully",
    updateErrorMsg: "Error updating lot",
  },
  map: {
    header: "Lot map",
    goBackBtn: "Go back",
  }
};

export default t;
