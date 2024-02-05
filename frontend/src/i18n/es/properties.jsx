const t = {
  list: {
    header: "Fincas",
    newBtn: "Nueva Finca",
    datagrid: {
      id: "ID",
      name: "Nombre",
      company: "Compañia",
      date: "Creado el",
      dateFormat: "{{val, datetime}}",
      updatedOn: "Actualizado el",
      updatedOnFormat: "{{val, datetime}}",
      actions: "Acciones",
    },
  },
  create: {
    header: "Nueva Finca",
    labels: {
      name: "Nombre",
      geodata: "Geolocalizacion",
    },
    errors: {
      requiredName: "El nombre es obligatorio",
      requiredGeodata: "La geolocalizacion es obligatoria",
    },
    saveBtn: "Guardar",
    goBackBtn: "Volver",
    createSuccessMsg: "Finca creada correctamente",
    createErrorMsg: "Error creando finca",
  },
  details: {
    header: "Detalles de la finca",
    labels: {
      name: "Nombre",
      geodata: "Geolocalizacion",
    },
    errors: {
      requiredName: "El nombre es obligatorio",
      requiredGeodata: "La geolocalizacion es obligatoria",
    },
    saveBtn: "Guardar",
    goBackBtn: "Volver",
    updateSuccessMsg: "Finca actualizada correctamente",
    updateErrorMsg: "Error actualizando finca",
  },
  map: {
    header: "Mapa de la finca",
    goBackBtn: "Volver",
  }
};

export default t;
