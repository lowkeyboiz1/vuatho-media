import { FormValues } from '@/forms/formSchema'

export const personalInfo = {
  name: '',
  gender: 'nam' as const,
  alias: '',
  birthYear: '',
  phone: '',
  address: '',
  facebook: ''
}

export const artworkInfo = {
  artworkName: '',
  artworkDescription: '',
  artworkFile: [],
  videoLink: '',
  driveFile: '',
  ekip: ''
}

export const policyDefaults = {
  policies: {
    policy1: false,
    policy2: false,
    policy3: false
  }
}

export const defaultValues: Partial<FormValues> = {
  ...personalInfo,
  ...artworkInfo,
  ...policyDefaults
}
