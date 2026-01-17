---
title: "Contact"
description: "Get in touch for collaborations, inquiries, or aerospace engineering discussions"

form:
  endpoint: "https://formsubmit.co/b1f5cf4e95aaf232f2096276715dbaca"
  heading: "Get in Touch"
  subheading: "All information will remain confidential and helps me respond effectively to your inquiry."
  
  fields:
    - name: "name"
      label: "Full Name"
      type: "text"
      placeholder: "John Doe"
      required: true
      autocomplete: "name"
      max_length: 100
      
    - name: "email"
      label: "Email Address"
      type: "email"
      placeholder: "john.doe@example.com"
      required: true
      autocomplete: "email"
      max_length: 150
      
    - name: "organization"
      label: "Organization / Affiliation"
      type: "text"
      placeholder: "University, Company, or Independent"
      required: false
      autocomplete: "organization"
      max_length: 150
    
    - name: "message"
      label: "Message"
      type: "textarea"
      placeholder: "Tell me about your project, question, or how we might work together..."
      required: true
      rows: 6
      max_length: 2000
      
  submit_button: "Send Message"
  
  success:
    heading: "Thank you for reaching out"
    message: "Your message has been successfully sent. I'll get back to you as soon as possible."
    subtext: "You may now close this page."
    
  formsubmit:
    next: ""
    captcha: false
    template: "box"
    
  validation:
    name:
      required: "Please enter your full name"
      min_length: "Name must be at least 2 characters"
      pattern: "Please enter a valid name"
    email:
      required: "Please enter your email address"
      invalid: "Please enter a valid email address"
    organization:
      max_length: "Organization name is too long"
    subject:
      required: "Please select a subject"
    message:
      required: "Please enter your message"
      min_length: "Message must be at least 10 characters"
      max_length: "Message must not exceed 2000 characters"
---

I welcome inquiries related to aerospace dynamics, control systems, flight mechanics, and engineering collaboration.
