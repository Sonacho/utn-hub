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
			<Button /* className='dark:border-slate-950 dark:bg-slate-900 dark:shadow-slate-950 bg-white hover:scale-105 p-3' */ onClick={() => setDarkTheme(!darkTheme)}>{darkTheme ? <SunIcon/> : <MoonIcon/>}</Button>
		</div>
	);
};

export default ThemeToggle;