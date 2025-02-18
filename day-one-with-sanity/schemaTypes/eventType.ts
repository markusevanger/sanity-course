import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'
import { DoorsOpenInput } from './components/DoorsOpenInput'

export const eventType = defineType({
    name: 'event',
    title: 'Event',
    type: 'document',
    icon: CalendarIcon,

    groups: [
        { name: 'details', title: 'Details' },
        { name: 'editorial', title: 'Editorial' },
    ],

    fields: [
        defineField({
            name: 'name',
            type: 'string',
            group: ['details', 'editorial'],
        }),

        defineField({
            name: 'eventType',
            type: 'string',
            group: 'details',
            options: {
                list: ['in-person', 'virtual'],
                layout: 'radio',
            },
        }),

        defineField({
            name: 'slug',
            type: 'slug',
            group: 'details',
            options: {
                source: 'name',
            },
            validation: (rule) => rule
                .required()
                .error(`Required to generate page on website`),

            hidden: ({ document }) => !document?.name,
        }),


        defineField({
            name: 'date',
            type: 'datetime',
            group: 'details',
        }),

        defineField({
            name: 'doorsOpen',
            group: 'details',
            description: 'The number of minutes before the event starts that the doors open',
            type: 'number',
            initialValue: 60,
            components: {
                input: DoorsOpenInput
            }
        }),

        defineField({
            name: 'venue',
            group: 'details',
            type: 'reference',
            to: [{ type: 'venue' }],
            readOnly: ({ document }) => document?.eventType === 'virtual',
            validation: (rule) =>
                rule.custom((value, context) => {
                    if (value && context?.document?.eventType === 'virtual') {
                        return 'Virtual events must not have a physical venue'
                    }
                    return true
                }),
        }),

        defineField({
            name: 'headline',
            type: 'reference',
            group: 'details',
            to: [{ type: 'artist' }],
        }),

        defineField({
            name: 'image',
            type: 'image',
            group: 'editorial',
        }),

        defineField({
            name: 'details',
            type: 'array',
            of: [{ type: 'block' }],
            group: 'editorial',
        }),

        defineField({
            name: 'tickets',
            type: 'url',
            group: 'details'
        }),

    ],
    // Update the preview key in the schema
    preview: {
        select: {
            name: 'name',
            venue: 'venue.name',
            artist: 'headline.name',
            date: 'date',
            image: 'image',
        },
        prepare({ name, venue, artist, date, image }) {
            const nameFormatted = name || 'Untitled event'
            const dateFormatted = date
                ? new Date(date).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                })
                : 'No date'

            return {
                title: artist ? `${nameFormatted} (${artist})` : nameFormatted,
                subtitle: venue ? `${dateFormatted} at ${venue}` : dateFormatted,
                media: image || CalendarIcon,
            }
        },
    },
})