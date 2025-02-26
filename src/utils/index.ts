import { GENDER_OPTIONS, TYPE_POST, TypePost } from '@/lib/contants'
import { FieldConfig, SectionConfig } from '@/types'
import { z } from 'zod'

const getYoutubeId = (url: string) => {
  if (!url) return null
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/))([^&?/]+)/)
  return match ? match[1] : null
}

function removeKeyOfSchema(schema: any, fieldsToRemove: string[]) {
  const shape: any = Object.fromEntries(Object.entries(schema.shape).filter(([key]) => !fieldsToRemove.includes(key)))
  return z.object(shape)
}

function removeFields(configs: SectionConfig[], fieldsToRemove: string[]) {
  return configs.map((section) => {
    const newFields = Object.keys(section.fields)
      .filter((key) => !fieldsToRemove.includes(key))
      .reduce((acc: any, key) => {
        acc[key] = section.fields[key]
        return acc
      }, {}) as Record<string, FieldConfig>

    return { ...section, fields: newFields }
  })
}

function pickKeysOfSchema(schema: any, fieldsToKeep: string[]) {
  const shape: any = Object.fromEntries(Object.entries(schema.shape).filter(([key]) => fieldsToKeep.includes(key)))
  return z.object(shape)
}

function pickFields(configs: SectionConfig[], fieldsToKeep: string[]) {
  return configs
    .map((section) => {
      const newFields = Object.keys(section.fields)
        .filter((key) => fieldsToKeep.includes(key))
        .reduce((acc: any, key) => {
          acc[key] = section.fields[key]
          return acc
        }, {}) as Record<string, FieldConfig>

      return { ...section, fields: newFields }
    })
    .filter((section) => Object.keys(section.fields).length > 0)
}

//  Hàm lấy danh sách các trường bắt buộc từ formSchema
const getRequiredFields = (schema: any, path = ''): Set<string> => {
  const requiredFields = new Set<string>()

  Object.entries(schema.shape).forEach(([key, value]: [string, any]) => {
    const fieldPath = path ? `${path}.${key}` : key

    if (value instanceof z.ZodObject) {
      const nestedFields = getRequiredFields(value, fieldPath)
      nestedFields.forEach((f) => requiredFields.add(f))
    } else if (value instanceof z.ZodArray) {
      if ('minLength' in value._def) requiredFields.add(fieldPath)
    } else if (value instanceof z.ZodString || value instanceof z.ZodNumber) {
      if (value._def.checks?.some((c: any) => c.kind === 'min' && c.value > 0)) {
        requiredFields.add(fieldPath)
      }
    } else if (value._def?.refinement) {
      requiredFields.add(fieldPath)
    }
  })

  return requiredFields
}

//  Hàm chuyển đổi object thành FormData
const objectToFormData = (obj: any) => {
  const formData = new FormData()

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      const valueIsFile = value instanceof File

      const isArrayData = Array.isArray(value)
      const initialValue = typeof value === 'number' ? Number(value) : ''

      if (isArrayData) {
        const isFile = value.some((item) => item instanceof File)
        if (isFile) {
          Array.prototype.forEach.call(value, (item) => {
            formData.append(key, item)
          })
        } else {
          formData.append(key, value ? JSON.stringify(value) : '')
        }
      } else {
        if (typeof value === 'object' && !isArrayData && !valueIsFile) {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, value || initialValue)
        }
      }
    }
  }

  return formData
}

function convertToNewFormat(frontendData: any, typePost: TypePost, typeCompetition: number) {
  // Xác định giới tính dạng số (1 cho nam, 0 cho nữ)
  // Giả sử "nam" là 1, các giá trị khác là 0
  const genderValue = frontendData?.gender === 'nam' ? GENDER_OPTIONS.MALE : GENDER_OPTIONS.FEMALE

  return {
    user_information: {
      name: frontendData?.name || '',
      nickname: frontendData?.alias || '',
      birthday: frontendData?.birthYear || '',
      gender: genderValue,
      phone: frontendData?.phone || '',
      address: frontendData?.address || '',
      facebook_link: frontendData?.facebook || ''
    },
    type: typePost,
    contest: {
      title: frontendData?.artworkName || '',
      description: frontendData?.artworkDescription || '',
      category: 'Phim tài liệu', // Giá trị mặc định hoặc từ dữ liệu nếu có
      ekip: frontendData?.episode || ''
    },
    media_competition_id: typeCompetition,
    media_info:
      typePost === TYPE_POST.VIDEO
        ? {
            video_link: frontendData?.videoLink
          }
        : frontendData?.artworkFile
  }
}

export { convertToNewFormat, getRequiredFields, getYoutubeId, objectToFormData, pickFields, pickKeysOfSchema, removeFields, removeKeyOfSchema }
