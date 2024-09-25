import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function SkeletonReview() {
  return (
    <section className="w-[25rem] border-slate-500 border-[.1rem] p-[1rem] rounded-xl bg-slate-700 flex flex-col gap-[1rem]">
      <div className="flex gap-[1rem]">
        <div className="w-[4rem] h-[3rem]  ">
          <Skeleton circle={true} count={1} className="w-[100%] h-[100%]" />
        </div>
        <div className="flex flex-col w-[100%]">
          <Skeleton count={2} />
        </div>
      </div>
      <div className="flex flex-col w-[100%]">
        <Skeleton />
        <Skeleton />
        <Skeleton className="h-[6rem]" />
      </div>
    </section>
  );
}
