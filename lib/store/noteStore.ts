import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Sample {
  a: string;
}

type DraftStore = {
  draft: Sample;
  setDraft: (a: Sample) => void;
  clearDraft: () => void;
};

const initialDraft: Sample = {
  a: "",
};

export const useNoteDraftStore = create<DraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (a) => set(() => ({ draft: a })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
