// "use client";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/fetcher";
import dayjs from "dayjs";

// Server Component
export default async function JobPage({ params }) {
  // Fetch job data based on the permalink passed in the URL
  const { permalink } = params;
  console.log("permalink: " + permalink);
  let job = null;

  try {
    const data = await fetcher(
      `/jobs?permalink=${encodeURIComponent(permalink)}`
    );
    job = data?.job;
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }

  return (
    <article className="p-3 max-w-5xl mx-auto">
      <header>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-[minmax(200px,1fr)_200px]">
          <div>
            <time
              className="text-sm mb-2 block"
              dateTime={dayjs(job?.createdAt).format("YYYY-MM-DD")}
            >
              {dayjs(job?.createdAt).format("MMMM D, YYYY")}
            </time>
            <h1 className="text-2xl font-semibold">
              {job?.companyName} is hiring for {job?.title} |{" "}
              {job?.location?.city}, {job?.location?.state}
            </h1>
            <div className="flex items-center gap-2 mt-4">
              <span className="px-3 font-semibold py-1 bg-gray-200 text-gray-700 rounded-md text-xs">
                Full Time
              </span>
              <span className="px-3 font-semibold py-1 bg-gray-200 text-gray-700 rounded-md text-xs">
                6-14 LPA
              </span>
            </div>
          </div>
        </div>
      </header>

      <section className="font-semibold mt-4">
        <h2>Job Overview:</h2>
      </section>

      {job?.skills.length > 0 && (
        <section className="flex gap-4 items-center">
          <h3 className="font-semibold mt-1 capitalize">Required Skills:</h3>
          <div
            className="text-sm font-semibold flex gap-2 flex-wrap items-center"
            role="list"
          >
            {job?.skills.map((item, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded capitalize"
                role="listitem"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="mt-4 flex flex-col gap-5">
        {job?.points.map((point) => (
          <div key={point._id}>
            <h3 className="font-semibold">{point.key}:</h3>
            {point.value.length === 1 ? (
              <p className="text-sm">{point.value[0]}</p>
            ) : (
              <ul className="list-disc list-inside text-sm">
                {point.value.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      <footer>
        <div className="hidden md:grid grid-cols-2 gap-3 mt-8">
          <Button aria-label="Apply for this job">Apply Now</Button>
        </div>
      </footer>
    </article>
  );
}
