import { useEffect, useState } from "react";

import Card from "./Card";
import Section from "./Section";
import FormRow from "./FormRow";
import FormGroup from "./FormGroup";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import PrimaryButton from "./PrimaryButton";

import {
    getSpeciesReferences,
    createSpeciesReference
} from "../services/speciesReferencesService";

function SpeciesReferences({ speciesId }) {

    const [references, setReferences] = useState([]);

    const [form, setForm] = useState({
        title: "",
        authors: "",
        publication_year: "",
        source: "",
        url: "",
        notes: ""
    });

    async function loadReferences() {

        try {

            const data = await getSpeciesReferences(speciesId);

            setReferences(data);

        } catch (error) {

            console.error(error);

        }

    }

    useEffect(() => {

        loadReferences();

    }, [speciesId]);

    async function saveReference() {

        try {

            await createSpeciesReference(
                speciesId,
                form
            );

            setForm({
                title: "",
                authors: "",
                publication_year: "",
                source: "",
                url: "",
                notes: ""
            });

            await loadReferences();

        } catch (error) {

            alert(error.message);

        }

    }

    return (

        <Section title="Referencias bibliográficas">

            <Card>

                <FormGroup label="Título">

                    <TextInput
                        value={form.title}
                        onChange={(e)=>setForm({...form,title:e.target.value})}
                    />

                </FormGroup>

                <FormGroup label="Autores">

                    <TextInput
                        value={form.authors}
                        onChange={(e)=>setForm({...form,authors:e.target.value})}
                    />

                </FormGroup>

                <FormRow>

                    <FormGroup label="Año">

                        <TextInput
                            value={form.publication_year}
                            onChange={(e)=>setForm({...form,publication_year:e.target.value})}
                        />

                    </FormGroup>

                    <FormGroup label="Fuente">

                        <TextInput
                            value={form.source}
                            onChange={(e)=>setForm({...form,source:e.target.value})}
                        />

                    </FormGroup>

                </FormRow>

                <FormGroup label="URL">

                    <TextInput
                        value={form.url}
                        onChange={(e)=>setForm({...form,url:e.target.value})}
                    />

                </FormGroup>

                <FormGroup label="Notas">

                    <TextArea
                        value={form.notes}
                        onChange={(e)=>setForm({...form,notes:e.target.value})}
                    />

                </FormGroup>

                <PrimaryButton onClick={saveReference}>
                    Guardar referencia
                </PrimaryButton>

            </Card>

            {references.map((reference)=>(

                <Card key={reference.id}>

                    <h3>{reference.title}</h3>

                    <p><strong>Autores:</strong> {reference.authors}</p>

                    <p><strong>Año:</strong> {reference.publication_year}</p>

                    <p><strong>Fuente:</strong> {reference.source}</p>

                </Card>

            ))}

        </Section>

    );

}

export default SpeciesReferences;