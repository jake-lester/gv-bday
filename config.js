// Shared configuration for Birthday Website
// This file contains all shared constants and settings

// Birthday target date - change this one location to update across all pages
const BIRTHDAY_CONFIG = {
    targetDate: new Date('September 5, 2024 00:00:00').getTime(),
    birthdayYear: 2024,
    birthdayMonth: 'September',
    birthdayDay: 5
};

// Export for use in other files
if (typeof window !== 'undefined') {
    window.BIRTHDAY_CONFIG = BIRTHDAY_CONFIG;
}
