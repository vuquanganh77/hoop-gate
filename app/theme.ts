import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
    theme: {
        tokens: {
            fonts: {
                heading: { value: `'Source Sans Pro', sans-serif` },
                body: { value: `'Source Sans Pro', sans-serif` },
            },
            breakpoints: {
                sm: { value: '320px' },
                md: { value: '768px' },
                lg: { value: '960px' },
                xl: { value: '1200px' },
                '2xl': { value: '1536px' },
            },

            
        },
    },
})

// const config = {
//     initialColorMode: 'light',
//     useSystemColorMode: false,
// };


// const styles = {
//     global: {
//         body: {
//             fontFamily: "'Source Sans Pro', sans-serif",
//         },
//     },
// };

// const Input = {
//     defaultProps: {
//         focusBorderColor: 'black'
//     }
// };



