import { NextResponse } from 'next/server'
import { inquiryFormSchema } from '@/lib/validation'

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
    const validation = inquiryFormSchema.safeParse(body)
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

    // Log the inquiry (in production, save to database or send email)
    console.log('=== INQUIRY REQUEST ===')
    console.log('Company:', body.companyName)
    console.log('Contact Person:', body.contactPerson)
    console.log('Email:', body.email)
    console.log('Phone:', body.phone)
    console.log('Project Location:', body.projectLocation)
    console.log('Tender Reference:', body.tenderReference)
    console.log('Message:', body.message)
    console.log('Items:', JSON.stringify(body.items, null, 2))
    console.log('======================')

    // TODO: In production, implement:
    // 1. Save to database (create Inquiry model)
    // 2. Send email notification using Nodemailer or similar
    // 3. Send confirmation email to customer
    // 4. Integrate with CRM if needed

    return NextResponse.json({
      success: true,
      message: 'Permintaan penawaran berhasil dikirim',
    })
  } catch (error) {
    console.error('Inquiry API error:', error)
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

