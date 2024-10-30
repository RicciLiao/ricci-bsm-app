import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {store} from "./app/store.ts";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/300-italic.css';
import '@fontsource/roboto/400-italic.css';
import '@fontsource/roboto/500-italic.css';
import '@fontsource/roboto/700-italic.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>,
)
