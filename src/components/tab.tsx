"use client";
import { useRouter, useSearchParams } from "next/navigation";

type StateTabProps = {
  value: string | number | null;
  label: string;
};
export const StateTab = ({
  states,
  baseUri,
}: {
  states: StateTabProps[];
  baseUri: string;
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const state = params.get("state");
  return (
    <div className="flex flex-wrap gap-3">
      {states.map((s, i) => (
        <button
          key={i}
          className={`border-2 rounded-full px-2 py-1 transition-all ease-in duration-150 font-medium
            ${state === s.value ? "border-none bg-primary-800 px-6 tracking-widest text-white font-semibold" : "border-primary-800 text-primary-800 hover:bg-primary-100"}`}
          type="button"
          onClick={() => {
            if (s.value == null) {
              router.push(baseUri);
            } else {
              router.push(`${baseUri}&state=${s.value}`);
            }
          }}
        >
          <span>{s.label}</span>
        </button>
      ))}
    </div>
  );
};
