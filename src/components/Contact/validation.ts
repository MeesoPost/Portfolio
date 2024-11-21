// Define interfaces for validation rules
interface ValidationPattern {
  value: RegExp;
  message: string;
}

interface ValidationLength {
  value: number;
  message: string;
}

interface ValidationRule {
  required: string | boolean;
  pattern?: ValidationPattern;
  maxLength?: ValidationLength;
  minLength?: ValidationLength;
}

// Teletex pattern for character validation
export const teletex =
  '[ -\\[\\]_a-z|\xA1-\xA5\xA7\xAA\xAB\xB0-\xB3\xB5-\xB7\xBA-\xCF\xD1-\xF7\xF9-\u0113\u0116-\u012B\u012E-\u0131\u0134-\u014D\u0150-\u017E\u2126]+';

export const nameValidation: ValidationRule = {
  required: 'Vul een naam in.',
  pattern: {
    value: new RegExp(`^${teletex}$`),
    message: 'De ingevulde naam is niet toegestaan. Gebruik geen speciale karakters.',
  },
  maxLength: {
    value: 200,
    message: 'De ingevulde naam is niet toegestaan. Gebruik niet meer dan 200 tekens.',
  },
};

export const emailValidation: ValidationRule = {
  required: 'Vul een e-mailadres in.',
  pattern: {
    value:
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message:
      'Het ingevulde e-mailadres is niet toegestaan. Vul een e-mailadres in, zoals bijvoorbeeld hallo@example.com.',
  },
  maxLength: {
    value: 200,
    message: 'Het ingevulde e-mailadres is niet toegestaan. Gebruik niet meer dan 200 tekens.',
  },
};

export const messageValidation: ValidationRule = {
  required: 'Vul uw vraag in.',
  maxLength: {
    value: 1000,
    message: 'Het bericht is te lang. Gebruik niet meer dan 1000 tekens.',
  },
};

// Helper function to validate a field
export const validateField = (name: string, value: string): string | null => {
  let validation: ValidationRule;

  switch (name) {
    case 'name':
      validation = nameValidation;
      break;
    case 'email':
      validation = emailValidation;
      break;
    case 'message':
      validation = messageValidation;
      break;
    default:
      return null;
  }

  // Check required
  if (validation.required && !value) {
    return typeof validation.required === 'string' ? validation.required : 'This field is required';
  }

  // Check pattern
  if (validation.pattern && value) {
    if (!validation.pattern.value.test(value)) {
      return validation.pattern.message;
    }
  }

  // Check maxLength
  if (validation.maxLength && value.length > validation.maxLength.value) {
    return validation.maxLength.message;
  }

  // Check minLength
  if (validation.minLength && value.length < validation.minLength.value) {
    return validation.minLength.message;
  }

  return null;
};
