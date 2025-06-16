import { _userAbout } from 'src/_mock';

import { AccountSocials } from '../account-socials';

// ----------------------------------------------------------------------

export function AccountSocialsView() {
  return <AccountSocials socialLinks={_userAbout.socialLinks} />;
}
