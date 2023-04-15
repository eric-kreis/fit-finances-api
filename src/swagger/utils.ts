interface IConstrain {
  field: string;
  constrain: string;
  required?: boolean,
}

export const createDocContrains = (...constrains: IConstrain[]) => `
<hr>
<h3>Restrições:</h3>
<ul>
${constrains.map(({ field, constrain, required }) => `<li>"${field}${required ? '*' : ''}": ${constrain};</li>`).join('')}
</ul>
`;

export const createDocDescription = (text: string, ...constrains: IConstrain[]) => (
  text + createDocContrains(...constrains)
);
