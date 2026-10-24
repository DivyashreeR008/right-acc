import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ServiceFinderAnswer {
  serviceType?: string;
  location?: string;
  budget?: string;
  urgency?: string;
}

export interface LeadFormDraft {
  businessName?: string;
  email?: string;
  phoneNumber?: string;
  serviceType?: string;
  message?: string;
}

export interface ProviderServiceListing {
  id: string;
  name: string;
  startingPrice: string;
  description: string;
}

export interface ProviderProfileDraft {
  businessName: string;
  email: string;
  phoneNumber: string;
  description: string;
  status: "pending_review" | "published";
  services: ProviderServiceListing[];
}

interface ServiceFinderState {
  answers: ServiceFinderAnswer;
  setAnswer: (key: keyof ServiceFinderAnswer, value: string) => void;
  reset: () => void;
}

export const useServiceFinderStore = create<ServiceFinderState>((set) => ({
  answers: {},
  setAnswer: (key, value) =>
    set((state) => ({ answers: { ...state.answers, [key]: value } })),
  reset: () => set({ answers: {} }),
}));

interface LeadFormState {
  draft: LeadFormDraft;
  setDraft: (key: keyof LeadFormDraft, value: string) => void;
  reset: () => void;
}

export const useLeadFormStore = create<LeadFormState>()(
  persist(
    (set) => ({
      draft: {},
      setDraft: (key, value) =>
        set((state) => ({ draft: { ...state.draft, [key]: value } })),
      reset: () => set({ draft: {} }),
    }),
    {
      name: "lead-form-draft",
    },
  ),
);

interface ProviderProfileState {
  profile: ProviderProfileDraft | null;
  saveProfile: (profile: ProviderProfileDraft) => void;
  updateProfile: (changes: Partial<ProviderProfileDraft>) => void;
  addService: (service: ProviderServiceListing) => void;
  updateService: (
    serviceId: string,
    changes: Partial<ProviderServiceListing>,
  ) => void;
  removeService: (serviceId: string) => void;
}

export const useProviderProfileStore = create<ProviderProfileState>()(
  persist(
    (set) => ({
      profile: null,
      saveProfile: (profile) => set({ profile }),
      updateProfile: (changes) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...changes } : null,
        })),
      addService: (service) =>
        set((state) => ({
          profile: state.profile
            ? {
                ...state.profile,
                services: [...state.profile.services, service],
              }
            : null,
        })),
      updateService: (serviceId, changes) =>
        set((state) => ({
          profile: state.profile
            ? {
                ...state.profile,
                services: state.profile.services.map((service) =>
                  service.id === serviceId
                    ? { ...service, ...changes }
                    : service,
                ),
              }
            : null,
        })),
      removeService: (serviceId) =>
        set((state) => ({
          profile: state.profile
            ? {
                ...state.profile,
                services: state.profile.services.filter(
                  (service) => service.id !== serviceId,
                ),
              }
            : null,
        })),
    }),
    { name: "provider-profile-draft" },
  ),
);
