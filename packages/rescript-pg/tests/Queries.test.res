open Jest

let then = (promise, fn) => Js.Promise.then_(fn, promise)

let client = Pg.Client.make()
beforeAllAsync(() => client->Pg.Client.connect)
afterAllAsync(() => client->Pg.Client.end)

testAsync("Client.query", () => {
  expectAssertions(1)
  client
  ->Pg.query("SELECT 42 num")
  ->then(result => {
    expect(result.rows)->toEqual([{"num": 42}])
    Js.Promise.resolve()
  })
})

testAsync("Client.query + params", () => {
  expectAssertions(1)
  client
  ->Pg.query(~parameters=(42, "text"), "SELECT $1::int num, $2::text str")
  ->then(result => {
    expect(result.rows)->toEqual([{"num": 42, "str": "text"}])
    Js.Promise.resolve()
  })
})

testAsyncCb("Client.queryCb", done => {
  expectAssertions(1)
  client->Pg.queryCb("SELECT 42 num", result => {
    expect((result->Belt.Result.getExn).rows)->toEqual([{"num": 42}])
    done(.)
  })
})

testAsyncCb("Client.queryCb + params", done => {
  expectAssertions(1)
  client->Pg.queryCb(~parameters=(42, "text"), "SELECT $1::int num, $2::text str", result => {
    expect((result->Belt.Result.getExn).rows)->toEqual([{"num": 42, "str": "text"}])
    done(.)
  })
})

testAsync("Client.queryConf", () => {
  expectAssertions(1)
  client
  ->Pg.queryConf(Pg.QueryConfig.make(~text="SELECT 42 num", ()))
  ->then(result => {
    expect(result.rows)->toEqual([{"num": 42}])
    Js.Promise.resolve()
  })
})

testAsync("Client.queryConf + rowMode:array", () => {
  expectAssertions(1)
  client
  ->Pg.queryConf(Pg.QueryConfig.make(~text="SELECT 42 num", ~rowMode=#array, ()))
  ->then(result => {
    expect(result.rows)->toEqual([[42]])
    Js.Promise.resolve()
  })
})

testAsync("Client.queryConf + params", () => {
  expectAssertions(1)
  client
  ->Pg.queryConf(
    Pg.QueryConfig.make(~text="SELECT $1::int num, $2::text str", ~values=(42, "text"), ()),
  )
  ->then(result => {
    expect(result.rows)->toEqual([{"num": 42, "str": "text"}])
    Js.Promise.resolve()
  })
})

testAsyncCb("Client.queryConfCb", done => {
  expectAssertions(1)
  client->Pg.queryConfCb(Pg.QueryConfig.make(~text="SELECT 42 num", ()), result => {
    expect((result->Belt.Result.getExn).rows)->toEqual([{"num": 42}])
    done(.)
  })
})
