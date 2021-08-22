import React from 'react';
import { NavLink } from 'react-router-dom';
// import logo from '/images/resume.png';
import { connect } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import * as authActions from '../../actions/authActions';
import {
	Box,
	Flex,
	HStack,
	Link,
	IconButton,
	Button,
	Image,
	useDisclosure,
	useColorModeValue,
	Stack,
	Text
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ArrowBackIcon } from '@chakra-ui/icons';

const Links = [ 'Dashboard', 'Projects', 'Team' ];

const CNavLink = ({ children }) => (
	<Link
		px={2}
		py={1}
		rounded={'md'}
		_hover={{
			textDecoration: 'none',
			bg: useColorModeValue('gray.200', 'gray.700')
		}}
		href={'#'}
	>
		{children}
	</Link>
);
function LoggesOut(props) {
	return (
		<Flex>
			<Link
				border="1px"
				_focus={{ boxShadow: 'base' }}
				borderColor="blackAlpha.400"
				px="2"
				pt="1"
				boxShadow="lg"
				pb="2"
				bg="blackAlpha.300"
				rounded="md"
				as={NavLink}
				to="/register"
				mx="4"
			>
				Register
			</Link>
			<Link
				border="1px"
				_focus={{ boxShadow: 'base' }}
				borderColor="blackAlpha.400"
				px="2"
				pt="1"
				boxShadow="lg"
				pb="2"
				bg="blackAlpha.300"
				rounded="md"
				as={NavLink}
				to="/login"
			>
				Sign In
			</Link>
		</Flex>
	);
}

const Header = props => {
	const auth = props.auth;
	const handleLogOut = () => {
		console.log('The user will sign out');
		props.signOut();
	};

	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box p="4" minH="4rem" px={4}>
			<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
				<IconButton
					size={'md'}
					icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
					aria-label={'Open Menu'}
					display={{ md: 'none' }}
					onClick={isOpen ? onClose : onOpen}
				/>
				<HStack spacing={8} alignItems={'center'}>
					<Box>
						<a href="/">
							<Image maxW="4rem" alt="logo" src={'/images/resume.png'} />
						</a>
					</Box>
					<HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
						<Link
							border="1px"
							_focus={{ boxShadow: 'base' }}
							borderColor="blackAlpha.400"
							px="2"
							pt="1"
							boxShadow="lg"
							pb="2"
							bg="blackAlpha.300"
							rounded="md"
							as={NavLink}
							to="/resume-templates"
						>
							Resume Templates
						</Link>
						<Link
							border="1px"
							_focus={{ boxShadow: 'base' }}
							borderColor="blackAlpha.400"
							px="2"
							pt="1"
							boxShadow="lg"
							pb="2"
							bg="blackAlpha.300"
							rounded="md"
							as={NavLink}
							to="/about-us"
						>
							About Us
						</Link>
						{/* {Links.map(link => <CNavLink key={link}>{link}</CNavLink>)} */}
					</HStack>
				</HStack>
				<Flex alignItems={'center'}>
					{isLoaded(auth) && !isEmpty(auth) ? (
						<React.Fragment>
							<NavLink to="/">
								<Text
									border="1px"
									_focus={{ boxShadow: 'base' }}
									borderColor="blackAlpha.400"
									px="2"
									pt="1"
									boxShadow="lg"
									pb="2"
									bg="blackAlpha.300"
									rounded="md"
									mx="4"
									fontWeight="semibold"
								>
									Logged in as {auth.email}
								</Text>
							</NavLink>

							<Button
								// border="1px"
								p="2rem"
								_focus={{ boxShadow: 'base' }}
								// px="2"
								// pt="1"
								boxShadow="lg"
								// pb="2"
								rounded="lg"
								onClick={handleLogOut}
								variant={'outline'}
								colorScheme={'red'}
								size={'md'}
								mr={4}
								leftIcon={<ArrowBackIcon />}
							>
								<Text fontSize="3xl">

								Log out
								</Text>
							</Button>
						</React.Fragment>
					) : (
						<LoggesOut />
					)}
				</Flex>
			</Flex>

			{isOpen ? (
				<Box pb={4} display={{ md: 'none' }}>
					<Stack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
						<Link
							border="1px"
							_focus={{ boxShadow: 'base' }}
							borderColor="blackAlpha.400"
							px="2"
							pt="1"
							boxShadow="lg"
							pb="2"
							bg="blackAlpha.300"
							rounded="md"
							as={NavLink}
							to="/resume-templates"
						>
							Resume Templates
						</Link>
						<Link
							border="1px"
							_focus={{ boxShadow: 'base' }}
							borderColor="blackAlpha.400"
							px="2"
							pt="1"
							boxShadow="lg"
							pb="2"
							bg="blackAlpha.300"
							rounded="md"
							as={NavLink}
							to="/about-us"
						>
							About Us
						</Link>
						{/* {Links.map(link => <CNavLink key={link}>{link}</CNavLink>)} */}
					</Stack>
				</Box>
			) : null}
		</Box>
	);
};

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth
	};
};
const mapDispatchToProps = dispatch => {
	return {
		signOut: () => dispatch(authActions.signout())
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
