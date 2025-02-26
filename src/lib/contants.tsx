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

const FIELD_CONFIGS: SectionConfig[] = [
  {
    title: 'THÔNG TIN CÁ NHÂN',
    fields: {
      name: { type: TYPE_INPUT.TEXT, placeholder: 'Nhập họ và tên', title: 'Họ và tên', halfWidth: true },
      gender: { type: TYPE_INPUT.GENDER, title: 'Giới tính', halfWidth: true },
      alias: {
        type: TYPE_INPUT.TEXT,
        placeholder: 'Nhập nghệ danh',
        title: 'Nghệ danh',
        halfWidth: true
      },
      birthYear: { type: TYPE_INPUT.TEXT, placeholder: '01/01/2000', title: 'Năm sinh', halfWidth: true },
      phone: { type: TYPE_INPUT.TEXT, placeholder: '0123 456 789', title: 'Số điện thoại' },
      address: { type: 'text', placeholder: 'Số nhà, đường, khu phố, phường, quận/huyện/thành phố, tỉnh.', title: 'Địa chỉ' },
      facebook: { type: 'text', placeholder: 'http://facebook.com/username', title: 'Link Facebook cá nhân' }
    }
  },
  {
    title: 'THÔNG TIN TÁC PHẨM',
    fields: {
      artworkName: { type: TYPE_INPUT.TEXT, placeholder: 'Anh Thợ của tôi', title: 'Tên tác phẩm' },
      artworkDescription: {
        type: TYPE_INPUT.TEXTAREA,
        placeholder: 'Mô tả về tác phẩm ...',
        title: 'Mô tả ngắn về tác phẩm tác phẩm'
      },
      ekip: { type: TYPE_INPUT.TEXTAREA, placeholder: 'Đạo diễn: Trần Văn B, Diễn viên chính: Nguyễn Văn A, Quay phim: Lê Thị C, Biên kịch: Phạm Minh D', title: 'Ekip/ Diễn viên' },
      artworkFile: { type: TYPE_INPUT.FILE, title: 'Hình ảnh tác phẩm' },
      videoLink: { type: TYPE_INPUT.TEXT, placeholder: 'http://facebook.com/username', title: 'Link video' },
      drive_link: {
        type: TYPE_INPUT.TEXT,
        placeholder: 'https://drive.google.com/file/d/file_id/view',
        title: 'File Drive (nếu có)'
      },
      'policies.policy1': {
        type: TYPE_INPUT.CHECKBOX,
        title: (
          <p>
            Tôi cam kết đã đọc và hiểu rõ <b>Thể lệ - Quy định</b> của cuộc thi "Sáng tạo không giới hạn, tỏa sáng cùng Vua Thợ".
          </p>
        )
      },
      'policies.policy2': {
        type: TYPE_INPUT.CHECKBOX,
        title: (
          <p>
            Tôi cam kết tác phẩm dự thi là <b>nguyên bản, không vi phạm bản quyền và tuân thủ các quy định của pháp luật</b>.
          </p>
        )
      },
      'policies.policy3': { type: TYPE_INPUT.CHECKBOX, title: 'Tôi đồng ý cho phép Ban Tổ chức sử dụng tác phẩm của tôi cho mục đích truyền thông, quảng bá về cuộc thi' }
    }
  }
]

const GENDER_OPTIONS = {
  FEMALE: 0,
  MALE: 1
}

export { TYPE_POST, FIELD_CONFIGS, GENDER_OPTIONS, TYPE_INPUT }
