import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/forms.scss';
import './FetchMedia.component.scss';
import { Button } from '../Button/Button.component';
import { useFetchMediaMutation, useInsertMediaMutation } from '../../features/adminApiSlice';

const MEDIA_TYPES = {
    movie: {
        label: 'Movie',
        hint: 'Search by title to generate a media object. Add a year to narrow it down, like Thor (2011).',
    },
    series: {
        label: 'Series',
        hint: 'Search by title to generate a media object for one season. Add a season to go straight to it, like Loki season 2.',
    },
}

type MediaType = keyof typeof MEDIA_TYPES;

type MediaOption = {
    id: string,
    label: string,
}

type AdminError = {
    status?: number | string,
    data?: {
        message?: string,
        options?: MediaOption[],
    },
}

const getErrorMessage = ({ status, data }: AdminError) => {
    if (status === 401 || status === 403) return 'You are not authorized. Try logging in again.';
    return data?.message || 'No Server Response';
}

export const FetchMedia = () => {
    const [type, setType] = useState<MediaType>('movie');
    const [title, setTitle] = useState('');
    const [code, setCode] = useState<string | null>(null);
    const [warnings, setWarnings] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [options, setOptions] = useState<MediaOption[]>([]);
    const [fetchMedia, { isLoading }] = useFetchMediaMutation();
    const [insertMedia, { isLoading: isInserting }] = useInsertMediaMutation();

    const clearResults = () => {
        setCode(null);
        setWarnings([]);
        setErrorMessage('');
        setOptions([]);
    }

    const changeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value as MediaType);
        clearResults();
    }

    const search = async (query: string) => {
        clearResults();

        try {
            const result = await fetchMedia({ type, title: query }).unwrap();
            setCode(result.output);
            setWarnings(result.warnings);
        } catch (err) {
            setErrorMessage(getErrorMessage(err as AdminError));
            setOptions((err as AdminError).data?.options || []);
        }
    }

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title.trim() && !isLoading && !isInserting) search(title.trim());
    }

    const insertCode = async () => {
        if (!window.confirm('Insert this media? If its chronologicalOrder is taken, that media and everything after it will move up by 1.')) return;
        setErrorMessage('');

        try {
            const { name, season, chronologicalOrder, shifted } = await insertMedia(code).unwrap();
            toast(`Inserted ${name}${season ? ` Season ${season}` : ''} at ${chronologicalOrder}. Moved ${shifted} other media up by 1.`);
        } catch (err) {
            setErrorMessage(getErrorMessage(err as AdminError));
        }
    }

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(code ?? '');
            toast('Copied to clipboard');
        } catch (err) {
            toast.error('Unable to copy to clipboard');
        }
    }

    return (
        <section className="fetch-media" aria-labelledby="fetch-media-heading">
            <h2 id="fetch-media-heading" className="fetch-media-heading">Fetch media</h2>
            <p className="form-intro">{MEDIA_TYPES[type].hint}</p>
            <form className="fetch-media-form" onSubmit={submitForm}>
                <select
                    className="form-input fetch-media-type"
                    aria-label="Media type"
                    value={type}
                    disabled={isLoading || isInserting}
                    onChange={changeType}
                >
                    {Object.entries(MEDIA_TYPES).map(([value, { label }]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
                <input
                    className="form-input"
                    type="text"
                    aria-label="Title"
                    placeholder={`${MEDIA_TYPES[type].label} title`}
                    maxLength={200}
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                />
                <Button
                    buttonType="submit"
                    text={isLoading ? 'Searching...' : 'Search'}
                    loading={isLoading}
                    disabled={!title.trim() || isInserting}
                />
            </form>

            {errorMessage && <div className="form-errors" role="alert">{errorMessage}</div>}

            {options.length > 0 && (
                <ul className="fetch-media-options" aria-label="Matches">
                    {options.map(({ id, label }) => (
                        <li key={id}>
                            <button type="button" disabled={isLoading} onClick={() => {search(id)}}>{label}</button>
                        </li>
                    ))}
                </ul>
            )}

            {warnings.length > 0 && (
                <ul className="fetch-media-warnings" role="status">
                    {warnings.map((warning) => <li key={warning}>{warning}</li>)}
                </ul>
            )}

            {code !== null && (
                <div className="code-block">
                    <div className="code-block-header">
                        <span>Media object</span>
                        <button type="button" className="code-block-copy" onClick={copyCode}>
                            <i className="fa-regular fa-copy"></i> Copy
                        </button>
                    </div>
                    <textarea
                        aria-label="Media object"
                        spellCheck={false}
                        readOnly={isInserting}
                        autoCapitalize="off"
                        autoCorrect="off"
                        rows={code.split('\n').length + 2}
                        value={code}
                        onChange={(e) => {setCode(e.target.value)}}
                    />
                    <div className="code-block-footer">
                        <Button
                            buttonType="button"
                            text={isInserting ? 'Inserting...' : 'Insert Media'}
                            callback={insertCode}
                            loading={isInserting}
                            disabled={!code.trim()}
                        />
                    </div>
                </div>
            )}
        </section>
    )
}
