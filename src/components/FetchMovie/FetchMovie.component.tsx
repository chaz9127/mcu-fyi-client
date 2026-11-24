import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/forms.scss';
import './FetchMovie.component.scss';
import { Button } from '../Button/Button.component';
import { useFetchMovieMutation, useInsertMediaMutation } from '../../features/adminApiSlice';

type MovieOption = {
    id: string,
    label: string,
}

type AdminError = {
    status?: number | string,
    data?: {
        message?: string,
        options?: MovieOption[],
    },
}

const getErrorMessage = ({ status, data }: AdminError) => {
    if (status === 401 || status === 403) return 'You are not authorized. Try logging in again.';
    return data?.message || 'No Server Response';
}

export const FetchMovie = () => {
    const [title, setTitle] = useState('');
    const [code, setCode] = useState<string | null>(null);
    const [warnings, setWarnings] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [options, setOptions] = useState<MovieOption[]>([]);
    const [fetchMovie, { isLoading }] = useFetchMovieMutation();
    const [insertMedia, { isLoading: isInserting }] = useInsertMediaMutation();

    const search = async (query: string) => {
        setCode(null);
        setWarnings([]);
        setErrorMessage('');
        setOptions([]);

        try {
            const result = await fetchMovie(query).unwrap();
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
            const { name, chronologicalOrder, shifted } = await insertMedia(code).unwrap();
            toast(`Inserted ${name} at ${chronologicalOrder}. Moved ${shifted} other media up by 1.`);
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
        <section className="fetch-movie" aria-labelledby="fetch-movie-heading">
            <h2 id="fetch-movie-heading" className="fetch-movie-heading">Fetch movie</h2>
            <p className="form-intro">Search by title to generate a media object. Add a year to narrow it down, like Thor (2011).</p>
            <form className="fetch-movie-form" onSubmit={submitForm}>
                <input
                    className="form-input"
                    type="text"
                    aria-label="Movie title"
                    placeholder="Movie title"
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
                <ul className="fetch-movie-options" aria-label="Matching movies">
                    {options.map(({ id, label }) => (
                        <li key={id}>
                            <button type="button" disabled={isLoading} onClick={() => {search(id)}}>{label}</button>
                        </li>
                    ))}
                </ul>
            )}

            {warnings.length > 0 && (
                <ul className="fetch-movie-warnings" role="status">
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
