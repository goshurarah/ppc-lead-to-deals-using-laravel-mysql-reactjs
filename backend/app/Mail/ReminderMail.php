<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class ReminderMail extends Mailable
{
    use Queueable, SerializesModels;

    public $data;
    /**
     * Create a new message instance.
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('support@ppcleadstodeal.com', 'PPC Leads to Deals'),
            subject: 'Lead Reminder',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {

      
        return new Content(
            view: 'mails.lead-reminder',
            with: [
                'address' => $this->data['address'],
                'state' => $this->data['state'],
                'city' => $this->data['city'],
                'county' => $this->data['county'],
                'seller' => $this->data['seller'],
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
