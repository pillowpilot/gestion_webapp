const t = {
  list: {
    header: "Inferencias",
    newBtn: "Nueva Inferencia",
    datagrid: {
      id: "ID",
      user: "Usuario",
      lot: "Lote",
      date: "Creado el",
      dateFormat: "{{val, datetime}}",
      updatedOn: "Actualizado el",
      updatedOnFormat: "{{val, datetime}}",
      model: "Modelo",
      taskId: "ID Tarea",
      coordinates: "Coordenadas",
      status: "Estado",
      actions: "Acciones",
    },
  },
  create: {
    header: "Nueva Inferencia",
    inferBtn: "Inferir",
    goBackBtn: "Volver",
    options: {
      leavesDiseases: "Enfermedades de Hojas",
      fruitsDiseases: "Enfermedades de Frutas",
      treeCounting: "Conteo de árboles",
    },
    labels: {
      inferenceModel: "Modelo de inferencia",
      lot: "Lote",
      inputImage: "Imagen de entrada",
    },
    successMsg: "Inferencia creada exitosamente",
    errorMsg: "Error creando inferencia",
  },
  details: {
    goBackBtn: "Volver",
    labels: {
      detailsHeader: "Detalles de la Inferencia",
      lot: "Lote",
      model: "Modelo",
      status: "Estado",
      createdOn: "Creado el",
      updatedOn: "Actualizado el",
      previewHeader: "Visualización"
    }
  },
  delete: {
    confirmationMsg: "Eliminar los datos de la inferencia? Esto no se puede deshacer.",
    successMsg: "Inferencia eliminada exitosamente",
    errorMsg: "Error eliminando inferencia",
    goBackBtn: "Volver",
    deleteBtn: "Eliminar",
  }
};

export default t;
