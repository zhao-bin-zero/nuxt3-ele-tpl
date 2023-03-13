// 倒计时
export const useCountDown = () => {
  const count = ref(0)
  // pause 停止  resume继续
  const { pause, resume, isActive } = useIntervalFn(
    () => {
      count.value--
      console.log('开启了定时器', count.value)
      if (count.value <= 0) {
        pause()
      }
    },
    1000,
    { immediate: false }
  )

  const start = (startNum = 60) => {
    // 赋值
    count.value = startNum
    // 调用
    resume()
  }
  return { count, start, pause, resume, isActive }
}
