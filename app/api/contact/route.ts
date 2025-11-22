import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validation'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate honeypot
    if (body.honeypot && body.honeypot.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Spam detected' },
        { status: 400 }
      )
    }

    // Validate form data
    const validation = contactFormSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Data tidak valid',
          errors: validation.error.errors,
        },
        { status: 400 }
      )
    }

    // Log the contact form (in production, save to database or send email)
    console.log('=== CONTACT FORM SUBMISSION ===')
    console.log('Name:', body.name)
    console.log('Company:', body.company)
    console.log('Email:', body.email)
    console.log('Phone:', body.phone)
    console.log('Location:', body.location)
    console.log('Message:', body.message)
    console.log('================================')

    // TODO: In production, implement:
    // 1. Save to database (create ContactSubmission model)
    // 2. Send email notification using Nodemailer or similar
    // 3. Send confirmation email to customer
    // 4. Integrate with CRM if needed

    return NextResponse.json({
      success: true,
      message: 'Pesan berhasil dikirim',
    })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
    }
}

