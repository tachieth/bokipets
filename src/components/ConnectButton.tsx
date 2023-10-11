import { Box, Button, Flex, Image } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const ConnectBTN = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <Box
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    bg="transparent"
                    borderWidth="1px"
                    borderColor="white"
                    color="white"
                    borderRadius="0"
                    _hover={{ bg: 'white', color: 'black' }}
                  >
                    WALLET CONNECT
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    colorScheme="red"
                    borderRadius="0"
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <Flex align="center" gap="12px">
                  <Button
                    onClick={openChainModal}
                    type="button"
                    bg="transparent"
                    borderWidth="1px"
                    borderColor="white"
                    color="white"
                    borderRadius="0"
                    _hover={{ bg: 'white', color: 'black' }}
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="center"
                  >
                    {chain.hasIcon && (
                      <Box
                        sx={{
                          background: chain.iconBackground,
                          width: "12px",
                          height: "12px",
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            sx={{ width: "12px", height: "12px" }}
                          />
                        )}
                      </Box>
                    )}
                    {chain.name}
                  </Button>

                  <Button
                    onClick={openAccountModal}
                    bg="transparent"
                    borderWidth="1px"
                    borderColor="white"
                    color="white"
                    borderRadius="0"
                    _hover={{ bg: 'white', color: 'black' }}
                  >
                    {account.displayName}
                    {account.displayBalance ? ` (${account.displayBalance})` : ''}
                  </Button>
                </Flex>
              );
            })()}
          </Box>
        );
      }}
    </ConnectButton.Custom>
  );
}

export default ConnectBTN;