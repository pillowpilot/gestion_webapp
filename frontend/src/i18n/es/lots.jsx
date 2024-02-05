const t = {
  list: {
    header: "Lotes",
    newBtn: "Nuevo Lote",
    datagrid: {
      id: "ID",
      name: "Nombre",
      property: "Finca",
      date: "Fecha",
      dateFormat: "{{val, datetime}}",
      actions: "Acciones",
    },
  },
  create: {
    header: "Nuevo Lote",
    labels: {
      name: "Nombre",
      property: "Finca",
    },
    errors: {
      requiredName: "El nombre es obligatorio",
      requiredProperty: "La finca es obligatoria",
      noPropertiesMsg: "No se encontraron fincas",
    },
    saveBtn: "Guardar",
    goBackBtn: "Volver",
    createSuccessMsg: "Lote creado correctamente",
    createErrorMsg: "Error creando el lote",
  },
  details: {
    header: "Detalles del lote",
    labels: {
      name: "Nombre",
      property: "Finca",
    },
    errors: {
      requiredName: "El nombre es obligatorio",
      requiredProperty: "La finca es obligatoria",
    },
    saveBtn: "Guardar",
    goBackBtn: "Volver",
    updateSuccessMsg: "Lote actualizado correctamente",
    updateErrorMsg: "Error actualizando el lote",
  },
  delete: {
    confirmationMsg: "Eliminar los datos del lote? Esto no se puede deshacer.",
    successMsg: "Lote eliminado exitosamente",
    goBackBtn: "Volver",
    deleteBtn: "Eliminar",
  },
  map: {
    header: "Mapa del lote",
    goBackBtn: "Volver",
  }
};

export default t;
