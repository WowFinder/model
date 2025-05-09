import {
    type PersonalDetails,
    personalDefaults,
} from '../../../Creature/Personal/builders';
import { importPersonalDetails } from '../../../Creature/Personal';

const mockPersonalDetails: PersonalDetails = importPersonalDetails({
    ...personalDefaults,
    fullName: 'Mocked Character',
    faith: 'Mocked Faith',
    origin: 'Mocked Origin',
    hair: 'Mocked Hair',
    eyes: 'Mocked Eyes',
    skin: 'Mocked Skin',
    gender: 'Mocked Gender',
});

export { mockPersonalDetails };
