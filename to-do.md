#TO-DO

---Pendientes relativamente pronto---

1. Sección Inventory:
   [x]Creación del método delete
   [x]Creación del método edit
   -Ver si abrir campos dinamicos en el form con la id
   []Creación del método check_dashboard
   [x]Creación del modal click image
2. Sección Tools:
   []Corregir la sección de editar - Se desactiva la entrega - Posibile edit en el form, con campos dinamicos por la id
3. Sección Imports/Exports:
   []Creación del modal con la tabla
   -Posiblemente se cree una sección Imports/Exports generales
   -Pero, el modal debe filtrar por id del row que se seleccione
   -También añadir metodos filtrados por row de crud

---Pendientes a futuro---

1. Sección In/Outs:
   []Comenzar con la tabla
   -Minimo con la sección, aunque la tabla este vacía
   -Tener el hook, con el service de get
   []Comenzar con el diseño del formulario
   -CAMPOS AUTOCOMPLETE:
   -responsible (login.user.name)
   -num_employee_responsible(login.user.num_employee)
   -status(Ingreso/Salida)
   -receiver (tabla_personal, referencia en out_tools)
   -num_employee_receiver(tabla_personal, referencia en out_tools)
   -shift (ver si puede ser dinámico depende la hora)
   -date(referencia en out_tools)
   -time(referencia en out_tools)
   -area(tabla tester/area)
   -tester(tabla tester/area)
   -material(referencia a la tabla inventory)
   -CAMPOS QUE NO SON AUTO COMPLETE:
   -Motivo SCRAP
   -QTY SCRAP
   -SN SCRAP
   -QTY MATERIAL
   -SN CAMBIO
   -COMMENTS
2. Tabla de Área y Testers:
   []Ver el diseño de la tabla y como se manejara
   -Testers y area en total.
