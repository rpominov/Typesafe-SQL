// Generated by @typesafe-sql

open PgTypes

// -- @getTypes
// select
//   t.oid,
//   t.typname,
//   t.typnamespace::regnamespace,
//   t.typlen,
//   t.typbyval,
//   t.typtype,
//   t.typcategory,
//   t.typispreferred,
//   t.typisdefined,
//   t.typdelim,
//   t.typrelid,
//   t.typelem,
//   t.typarray,
//   t.typnotnull,
//   t.typbasetype,
//   t.typtypmod,
//   t.typndims,
//   t.typcollation,
//   t.typdefault,
//   r.rngsubtype,
//   (select array_agg(a.attname::text order by a.attnum)
//     from pg_attribute a
//     where a.attrelid = t.typrelid
//     and a.attisdropped = false
//     and a.attnum >= 0) as attr_names,
//   (select array_agg(a.atttypid order by a.attnum)
//     from pg_attribute a where a.attrelid = t.typrelid
//     and a.attisdropped = false
//     and a.attnum >= 0) as attr_types,
//   (select array_agg(e.enumlabel::text order by e.enumsortorder)
//     from pg_enum e where e.enumtypid = t.oid) as enum_labels
// from pg_type t
// left join pg_range r on r.rngtypid = t.oid
// where t.oid = ANY ($typeIds::int[])
module GetTypes = {
  let statement = "-- @getTypes\nselect\n  t.oid,\n  t.typname,\n  t.typnamespace::regnamespace,\n  t.typlen,\n  t.typbyval,\n  t.typtype,\n  t.typcategory,\n  t.typispreferred,\n  t.typisdefined,\n  t.typdelim,\n  t.typrelid,\n  t.typelem,\n  t.typarray,\n  t.typnotnull,\n  t.typbasetype,\n  t.typtypmod,\n  t.typndims,\n  t.typcollation,\n  t.typdefault,\n  r.rngsubtype,\n  (select array_agg(a.attname::text order by a.attnum) \n    from pg_attribute a \n    where a.attrelid = t.typrelid \n    and a.attisdropped = false\n    and a.attnum >= 0) as attr_names,\n  (select array_agg(a.atttypid order by a.attnum) \n    from pg_attribute a where a.attrelid = t.typrelid \n    and a.attisdropped = false\n    and a.attnum >= 0) as attr_types,\n  (select array_agg(e.enumlabel::text order by e.enumsortorder)\n    from pg_enum e where e.enumtypid = t.oid) as enum_labels\nfrom pg_type t\nleft join pg_range r on r.rngtypid = t.oid\nwhere t.oid = ANY ($1::int[])"
  type parameters = array<Pg_catalog._int4>
  type parametersRecord = {typeIds: Pg_catalog._int4}
  type row = (
    option<Pg_catalog.oid>,
    option<Pg_catalog.name>,
    option<Pg_catalog.regnamespace>,
    option<Pg_catalog.int2>,
    option<Pg_catalog.bool_>,
    option<Pg_catalog.char_>,
    option<Pg_catalog.char_>,
    option<Pg_catalog.bool_>,
    option<Pg_catalog.bool_>,
    option<Pg_catalog.char_>,
    option<Pg_catalog.oid>,
    option<Pg_catalog.oid>,
    option<Pg_catalog.oid>,
    option<Pg_catalog.bool_>,
    option<Pg_catalog.oid>,
    option<Pg_catalog.int4>,
    option<Pg_catalog.int4>,
    option<Pg_catalog.oid>,
    option<Pg_catalog.text>,
    option<Pg_catalog.oid>,
    option<Pg_catalog._text>,
    option<Pg_catalog._oid>,
    option<Pg_catalog._text>,
  )
  type rowRecord = {
    oid: option<Pg_catalog.oid>,
    typname: option<Pg_catalog.name>,
    typnamespace: option<Pg_catalog.regnamespace>,
    typlen: option<Pg_catalog.int2>,
    typbyval: option<Pg_catalog.bool_>,
    typtype: option<Pg_catalog.char_>,
    typcategory: option<Pg_catalog.char_>,
    typispreferred: option<Pg_catalog.bool_>,
    typisdefined: option<Pg_catalog.bool_>,
    typdelim: option<Pg_catalog.char_>,
    typrelid: option<Pg_catalog.oid>,
    typelem: option<Pg_catalog.oid>,
    typarray: option<Pg_catalog.oid>,
    typnotnull: option<Pg_catalog.bool_>,
    typbasetype: option<Pg_catalog.oid>,
    typtypmod: option<Pg_catalog.int4>,
    typndims: option<Pg_catalog.int4>,
    typcollation: option<Pg_catalog.oid>,
    typdefault: option<Pg_catalog.text>,
    rngsubtype: option<Pg_catalog.oid>,
    attr_names: option<Pg_catalog._text>,
    attr_types: option<Pg_catalog._oid>,
    enum_labels: option<Pg_catalog._text>,
  }
  let convertParameters = (r: parametersRecord): parameters => [r.typeIds]
  let convertRow = (
    (
      oid,
      typname,
      typnamespace,
      typlen,
      typbyval,
      typtype,
      typcategory,
      typispreferred,
      typisdefined,
      typdelim,
      typrelid,
      typelem,
      typarray,
      typnotnull,
      typbasetype,
      typtypmod,
      typndims,
      typcollation,
      typdefault,
      rngsubtype,
      attr_names,
      attr_types,
      enum_labels,
    ): row,
  ): rowRecord => {
    oid: oid,
    typname: typname,
    typnamespace: typnamespace,
    typlen: typlen,
    typbyval: typbyval,
    typtype: typtype,
    typcategory: typcategory,
    typispreferred: typispreferred,
    typisdefined: typisdefined,
    typdelim: typdelim,
    typrelid: typrelid,
    typelem: typelem,
    typarray: typarray,
    typnotnull: typnotnull,
    typbasetype: typbasetype,
    typtypmod: typtypmod,
    typndims: typndims,
    typcollation: typcollation,
    typdefault: typdefault,
    rngsubtype: rngsubtype,
    attr_names: attr_names,
    attr_types: attr_types,
    enum_labels: enum_labels,
  }
  @send
  external run: (
    NodePostgres.client,
    {"values": parameters, "text": string},
  ) => Promise.t<NodePostgres.queryResult<rowRecord>> = "query"
  let run = (client, parameters) =>
    run(client, {"values": parameters->convertParameters, "text": statement})
  @send
  external runArray: (
    NodePostgres.client,
    {"values": parameters, "text": string, "rowMode": [#array]},
  ) => Promise.t<NodePostgres.queryResult<row>> = "query"
  let runArray = (client, parameters) =>
    runArray(
      client,
      {"values": parameters->convertParameters, "text": statement, "rowMode": #array},
    )
}

// -- @getAttributes
// select
//   a.attrelid,
//   a.attnum,
//   a.attname,
//   a.atttypid,
//   a.attndims,
//   a.atttypmod,
//   a.attnotnull,
//   a.attcollation,
//   a.attoptions,
//   a.attfdwoptions
// from pg_catalog.pg_attribute a where attrelid = ANY ($relIds::int[])
module GetAttributes = {
  let statement = "-- @getAttributes\nselect\n  a.attrelid,\n  a.attnum,\n  a.attname,\n  a.atttypid,\n  a.attndims,\n  a.atttypmod,\n  a.attnotnull,\n  a.attcollation,\n  a.attoptions,\n  a.attfdwoptions\nfrom pg_catalog.pg_attribute a where attrelid = ANY ($1::int[])"
  type parameters = array<Pg_catalog._int4>
  type parametersRecord = {relIds: Pg_catalog._int4}
  type row = (
    option<Pg_catalog.oid>,
    option<Pg_catalog.int2>,
    option<Pg_catalog.name>,
    option<Pg_catalog.oid>,
    option<Pg_catalog.int4>,
    option<Pg_catalog.int4>,
    option<Pg_catalog.bool_>,
    option<Pg_catalog.oid>,
    option<Pg_catalog._text>,
    option<Pg_catalog._text>,
  )
  type rowRecord = {
    attrelid: option<Pg_catalog.oid>,
    attnum: option<Pg_catalog.int2>,
    attname: option<Pg_catalog.name>,
    atttypid: option<Pg_catalog.oid>,
    attndims: option<Pg_catalog.int4>,
    atttypmod: option<Pg_catalog.int4>,
    attnotnull: option<Pg_catalog.bool_>,
    attcollation: option<Pg_catalog.oid>,
    attoptions: option<Pg_catalog._text>,
    attfdwoptions: option<Pg_catalog._text>,
  }
  let convertParameters = (r: parametersRecord): parameters => [r.relIds]
  let convertRow = (
    (
      attrelid,
      attnum,
      attname,
      atttypid,
      attndims,
      atttypmod,
      attnotnull,
      attcollation,
      attoptions,
      attfdwoptions,
    ): row,
  ): rowRecord => {
    attrelid: attrelid,
    attnum: attnum,
    attname: attname,
    atttypid: atttypid,
    attndims: attndims,
    atttypmod: atttypmod,
    attnotnull: attnotnull,
    attcollation: attcollation,
    attoptions: attoptions,
    attfdwoptions: attfdwoptions,
  }
  @send
  external run: (
    NodePostgres.client,
    {"values": parameters, "text": string},
  ) => Promise.t<NodePostgres.queryResult<rowRecord>> = "query"
  let run = (client, parameters) =>
    run(client, {"values": parameters->convertParameters, "text": statement})
  @send
  external runArray: (
    NodePostgres.client,
    {"values": parameters, "text": string, "rowMode": [#array]},
  ) => Promise.t<NodePostgres.queryResult<row>> = "query"
  let runArray = (client, parameters) =>
    runArray(
      client,
      {"values": parameters->convertParameters, "text": statement, "rowMode": #array},
    )
}
