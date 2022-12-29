import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';
export function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<GlobalStyle />
			<h1>Hellow orld</h1>
			<button>enviar</button>
		</ThemeProvider>
	); 
}

