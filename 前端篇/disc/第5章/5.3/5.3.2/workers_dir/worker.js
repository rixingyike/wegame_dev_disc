// JS：disc\第5章\5.3\5.3.2\workers_dir\worker.js
worker.onMessage(res => {
  console.log("Worker received：", res.msg) // 1，Output：Worker received： Hi worker!
  clearTimeout(res.timerId)

  const timerId = setTimeout(() => {
    console.log("This's in worker") // 4，Output：This's in worker
  }, 600)

  worker.postMessage({
    msg: "Hi main!",
    timerId
  })
})