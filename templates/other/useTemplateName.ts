import { useState } from 'react';

export interface ITemplateName {
}

export interface ITemplateNameState {
}

// eslint-disable-next-line no-empty-pattern
export function useTemplateName({ }: ITemplateName) {
	const [state, setState] = useState<ITemplateNameState>({
	});

	return state;
}
