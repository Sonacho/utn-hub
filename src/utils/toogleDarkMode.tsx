'use client';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useState, useEffect} from 'react';
import { Button } from '~/components/ui/button';

const ThemeToggle = () => {
	const [darkTheme, setDarkTheme] = useState(true);

	useEffect(() => {
		const theme = localStorage.getItem('theme');
		if (theme === 'dark') {
			setDarkTheme(true);
		} else {
			setDarkTheme(false);
		}
	}, []);

	useEffect(() => {
		if (darkTheme) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}, [darkTheme]);

	return (
		<div>
			<Button onClick={() => setDarkTheme(!darkTheme)}>{darkTheme ? <SunIcon/> : <MoonIcon/>}</Button>
		</div>
	);
};

export default ThemeToggle;