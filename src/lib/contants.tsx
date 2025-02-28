import { useTranslation } from '@/components/TranslationProvider'
import { SectionConfig } from '@/types'

export type TypePost = 'image' | 'video'

const TYPE_POST = {
  IMAGE: 'image',
  VIDEO: 'video'
} as const

const TYPE_INPUT = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  CHECKBOX: 'checkbox',
  FILE: 'file',
  GENDER: 'gender'
} as const

const FIELD_CONFIGS = (): SectionConfig[] => {
  const { language } = useTranslation()
  const messages: any = {
    vi: {
      personalInfo: 'THÔNG TIN CÁ NHÂN',
      fullName: 'Họ và tên',
      enterFullName: 'Nhập họ và tên',
      gender: 'Giới tính',
      stageName: 'Nghệ danh',
      enterStageName: 'Nhập nghệ danh',
      birthYear: 'Năm sinh',
      enterBirthYear: '01/01/2000',
      phone: 'Số điện thoại',
      enterPhone: '0123 456 789',
      address: 'Địa chỉ',
      enterAddress: 'Số nhà, đường, khu phố, phường, quận/huyện/thành phố, tỉnh.',
      facebook: 'Link Facebook cá nhân',
      enterFacebook: 'http://facebook.com/username',

      artworkInfo: 'THÔNG TIN TÁC PHẨM',
      artworkTitle: 'Tên tác phẩm',
      enterArtworkTitle: 'Anh Thợ của tôi',
      artworkDescription: 'Mô tả ngắn về tác phẩm',
      enterArtworkDescription: 'Mô tả về tác phẩm ...',
      ekip: 'Ekip/ Diễn viên',
      enterEkip: 'Đạo diễn: Trần Văn B, Diễn viên chính: Nguyễn Văn A, Quay phim: Lê Thị C, Biên kịch: Phạm Minh D',
      artworkImage: 'Hình ảnh tác phẩm',
      videoLink: 'Link video',
      enterVideoLink: 'http://facebook.com/username',
      driveFile: 'File Drive (nếu có)',
      enterDriveFile: 'https://drive.google.com/file/d/file_id/view',

      policy1: 'Tôi cam kết đã đọc và hiểu rõ Thể lệ - Quy định của cuộc thi "Sáng tạo không giới hạn, tỏa sáng cùng Vua Thợ".',
      policy2: 'Tôi cam kết tác phẩm dự thi là nguyên bản, không vi phạm bản quyền và tuân thủ các quy định của pháp luật.',
      policy3: 'Tôi đồng ý cho phép Ban Tổ chức sử dụng tác phẩm của tôi cho mục đích truyền thông, quảng bá về cuộc thi.'
    },

    en: {
      personalInfo: 'PERSONAL INFORMATION',
      fullName: 'Full Name',
      enterFullName: 'Enter full name',
      gender: 'Gender',
      stageName: 'Stage Name',
      enterStageName: 'Enter stage name',
      birthYear: 'Year of Birth',
      enterBirthYear: '01/01/2000',
      phone: 'Phone Number',
      enterPhone: '0123 456 789',
      address: 'Address',
      enterAddress: 'House number, street, neighborhood, ward, district/city, province.',
      facebook: 'Personal Facebook Link',
      enterFacebook: 'http://facebook.com/username',

      artworkInfo: 'ARTWORK INFORMATION',
      artworkTitle: 'Artwork Title',
      enterArtworkTitle: 'My Craftsman',
      artworkDescription: 'Short Description of the Artwork',
      enterArtworkDescription: 'Describe the artwork ...',
      ekip: 'Team / Cast',
      enterEkip: 'Director: Tran Van B, Main Actor: Nguyen Van A, Cinematographer: Le Thi C, Screenwriter: Pham Minh D',
      artworkImage: 'Artwork Image',
      videoLink: 'Video Link',
      enterVideoLink: 'http://facebook.com/username',
      driveFile: 'Google Drive File (if available)',
      enterDriveFile: 'https://drive.google.com/file/d/file_id/view',

      policy1: 'I confirm that I have read and fully understand the Rules and Regulations of the "Unlimited Creativity, Shine with King Craftsman" competition.',
      policy2: 'I confirm that the submitted artwork is original, does not violate copyright, and complies with legal regulations.',
      policy3: 'I agree to allow the Organizing Committee to use my artwork for communication and promotion purposes related to the competition.'
    }
  }

  return [
    {
      title: messages[language].personalInfo,
      fields: {
        name: { type: TYPE_INPUT.TEXT, placeholder: messages[language].enterFullName, title: messages[language].fullName, halfWidth: true },
        gender: { type: TYPE_INPUT.GENDER, title: messages[language].gender, halfWidth: true },
        alias: { type: TYPE_INPUT.TEXT, placeholder: messages[language].enterStageName, title: messages[language].stageName, halfWidth: true },
        birthYear: { type: TYPE_INPUT.TEXT, placeholder: messages[language].enterBirthYear, title: messages[language].birthYear, halfWidth: true },
        phone: { type: TYPE_INPUT.TEXT, placeholder: messages[language].enterPhone, title: messages[language].phone },
        address: { type: 'text', placeholder: messages[language].enterAddress, title: messages[language].address },
        facebook: { type: 'text', placeholder: messages[language].enterFacebook, title: messages[language].facebook }
      }
    },
    {
      title: messages[language].artworkInfo,
      fields: {
        artworkName: { type: TYPE_INPUT.TEXT, placeholder: messages[language].enterArtworkTitle, title: messages[language].artworkTitle },
        artworkDescription: { type: TYPE_INPUT.TEXTAREA, placeholder: messages[language].enterArtworkDescription, title: messages[language].artworkDescription },
        ekip: { type: TYPE_INPUT.TEXTAREA, placeholder: messages[language].enterEkip, title: messages[language].ekip },
        artworkFile: { type: TYPE_INPUT.FILE, title: messages[language].artworkImage },
        videoLink: { type: TYPE_INPUT.TEXT, placeholder: messages[language].enterVideoLink, title: messages[language].videoLink },
        drive_link: { type: TYPE_INPUT.TEXT, placeholder: messages[language].enterDriveFile, title: messages[language].driveFile },
        'policies.policy1': { type: TYPE_INPUT.CHECKBOX, title: messages[language].policy1 },
        'policies.policy2': { type: TYPE_INPUT.CHECKBOX, title: messages[language].policy2 },
        'policies.policy3': { type: TYPE_INPUT.CHECKBOX, title: messages[language].policy3 }
      }
    }
  ]
}

const GENDER_OPTIONS = {
  FEMALE: 0,
  MALE: 1
}

export { TYPE_POST, FIELD_CONFIGS, GENDER_OPTIONS, TYPE_INPUT }
