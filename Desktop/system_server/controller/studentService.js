const Router = require("koa-router")
const router = new Router()
const mongoose = require("mongoose")

router.post("/postService", async ctx => {
  const ServiceSchema = mongoose.model("Service")
  const serviceSchema = new ServiceSchema(ctx.request.body)
  await ServiceSchema.find((err, res) => {
    if (res.length === 0) {
      serviceSchema.save()
      ctx.body = {
        code: 200,
        message: "保存成功"
      }
    } else {
      const id = res[0]._id
      ServiceSchema.findByIdAndUpdate(id, ctx.request.body, (err, res) => {
        if (err) {
          ctx.body = {
            code: 500,
            message: "更新失败"
          }
        } else {
          ctx.body = {
            code: 200,
            message: "更新成功"
          }
        }
      })
    }
  })
})

router.get("/getService", async ctx => {
  const ServiceSchema = mongoose.model("Service")
  await ServiceSchema.findOne({ username: ctx.query.username })
    .then(res => {
      ctx.body = res
    })
    .catch(err => {
      console.log(err)
    })
})


module.exports = router
