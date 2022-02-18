// // Generated by @typesafe-sql

// open PgTypes

// // -- @getTypes
// // select
// //  	n.oid namespace_oid,
// //  	n.nspname,
// //  	t.oid,
// //  	t.typname,
// //  	t.typtype,
// //  	t.typcategory,
// //  	t.typdelim,
// //  	e.oid elem_oid,
// //  	e.typname elem_typname,
// //  	e.typtype elem_typtype,
// //  	e.typcategory elem_typcategory
// // from pg_type t
// // left join pg_namespace n on t.typnamespace = n.oid
// // left join pg_type e on t.typelem = e.oid
// // where t.oid = ANY ($typeIds::int[])
// module GetTypes = {
//   let statement = "-- @getTypes\nselect\n \tn.oid namespace_oid,\n \tn.nspname,\n \tt.oid,\n \tt.typname, \n \tt.typtype,\n \tt.typcategory,\n \tt.typdelim,\n \te.oid elem_oid, \n \te.typname elem_typname,\n \te.typtype elem_typtype,\n \te.typcategory elem_typcategory\nfrom pg_type t \nleft join pg_namespace n on t.typnamespace = n.oid \nleft join pg_type e on t.typelem = e.oid\nwhere t.oid = ANY ($1::int[])"

//   type parameters = array<Pg_catalog.\"_int4">

//   type parametersRecord = {
//     \"typeIds": Pg_catalog.\"_int4"
//   }

//   let convertParameters = (r: parametersRecord): parameters => (r.\"typeIds")

//   type row = (
//     Pg_catalog.\"oid",
//     Pg_catalog.\"name",
//     Pg_catalog.\"oid",
//     Pg_catalog.\"name",
//     Pg_catalog.\"char_",
//     Pg_catalog.\"char_",
//     Pg_catalog.\"char_",
//     Pg_catalog.\"oid",
//     Pg_catalog.\"name",
//     Pg_catalog.\"char_",
//     Pg_catalog.\"char_"
//   )

//   type rows = array<row>

//   type rowRecord = {
//     \"namespace_oid": Pg_catalog.\"oid",
//     \"nspname": Pg_catalog.\"name",
//     \"oid": Pg_catalog.\"oid",
//     \"typname": Pg_catalog.\"name",
//     \"typtype": Pg_catalog.\"char_",
//     \"typcategory": Pg_catalog.\"char_",
//     \"typdelim": Pg_catalog.\"char_",
//     \"elem_oid": Pg_catalog.\"oid",
//     \"elem_typname": Pg_catalog.\"name",
//     \"elem_typtype": Pg_catalog.\"char_",
//     \"elem_typcategory": Pg_catalog.\"char_"
//   }
// }

