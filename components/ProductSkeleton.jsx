export default function ProductSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4 p-6 animate-pulse">
      <div className="w-full aspect-[5/6] rounded-2xl bg-neutral-100" />
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="h-3 w-16 rounded-full bg-neutral-100" />
        <div className="h-5 w-32 rounded-full bg-neutral-100" />
        <div className="h-4 w-12 rounded-full bg-neutral-100" />
      </div>
    </div>
  )
}
