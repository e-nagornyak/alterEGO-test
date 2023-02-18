import {AppInitialStateType, appReducer, setAppError, setAppStatus, setInitialized} from "./App-reducer";

let startState: AppInitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isInitialized: false
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppError({error: 'some error'}))

    expect(endState.error).toBe('some error');
})

test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatus({status: 'loading'}))

    expect(endState.status).toBe('loading');
})

test('correct initialization should be set', () => {
    const endState = appReducer(startState, setInitialized({isInitialized: true}))

    expect(endState.isInitialized).toBe(true);
})