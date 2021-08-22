import React from 'react';
import logo from '../../static/images/resume.png';
import { NavLink } from 'react-router-dom';
import { Box, Button, Center, Heading, Image, Text } from '@chakra-ui/react';
const Lp = () => {
	return (
		<Box>
			<Heading my="16" textAlign="center" fontSize="6xl" mx="10%">
				Create a resume that stands out
			</Heading>
			<Text my="16" textAlign="center" fontSize="6xl" mx="10%">
				Create a Resume that perfectally describes your skils and match job profile.
			</Text>
			<Center my="16">
				<NavLink to="/getting-started">
					<Button h="6rem" p="4" colorScheme="teal" boxShadow="lg" _focus={{ boxShadow: 'md' }}>
						<Text p="4" textAlign="center" fontSize="5xl">
							Get Started for Free
						</Text>
					</Button>
				</NavLink>
			</Center>
<Center>

			<Image src={logo} className="lp-resume" alt="logo" />
</Center>
		</Box>
	);
};

export default Lp;
