

export const ButtonLoading = () => {
  return (
<div className="flex-col gap-4 w-full flex items-center justify-center">
  <div
    className="w-7 h-7 border-2 border-transparent text-startPurple text-4xl animate-spin flex items-center justify-center border-t-startPurple rounded-full"
  >
    <div
      className="w-5 h-5 border-2 border-transparent text-startGreen text-2xl animate-spin flex items-center justify-center border-t-startGreen rounded-full"
    ></div>
  </div>
</div>
  )
}