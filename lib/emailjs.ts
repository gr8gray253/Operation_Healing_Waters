import emailjs from '@emailjs/browser'

export const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? ''
export const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ''
export const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? ''

export interface ContactFormData {
  name:      string
  email:     string
  phone:     string
  date:      string
  groupSize: string
  isVeteran: string
  message:   string
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      from_name:  data.name,
      from_email: data.email,
      phone:      data.phone,
      trip_date:  data.date,
      group_size: data.groupSize,
      is_veteran: data.isVeteran,
      message:    data.message,
      reply_to:   data.email,
    },
    EMAILJS_PUBLIC_KEY,
  )
}
