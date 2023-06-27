import { FC } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui";
import { useGenericStableTokenDecimals, useGenericStableTokenSymbol } from "@/generated";

const AddToWallet = ({ address }: { address: `0x${string}` }) => {
  const { data: tokenSymbol } = useGenericStableTokenSymbol({ address: address });
  const { data: tokenDecimals } = useGenericStableTokenDecimals({ address: address });

  return (
    <button
      className="hover:opacity-70 transition-opacity"
      onClick={() => {
        // @ts-ignore
        if (window.ethereum) {
          // @ts-ignore
          window.ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20", // Initially only supports ERC20, but eventually more!
              options: {
                address: address, // The address that the token is at.
                symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                decimals: tokenDecimals, // The number of decimals in the token
              },
            },
          });
        }
      }}
    >
      <i className="ri-add-circle-line"></i>
    </button>
  );
};

interface Props {
  address: `0x${string}` | undefined;
  copyable?: boolean;
  addToWallet?: boolean;
  tooltip?: boolean;
}

export const Address: FC<Props> = ({
  address,
  copyable = false,
  addToWallet = false,
  tooltip = false,
}) => {
  if (!address) return <span>Guest</span>;
  const formattedAddress = address.slice(0, 5) + "..." + address.slice(-4);
  return (
    <span className="inline-flex gap-2">
      <span>
        {!tooltip ? (
          formattedAddress
        ) : (
          <Tooltip>
            <TooltipTrigger className="cursor-help">{formattedAddress}</TooltipTrigger>
            <TooltipContent>{address}</TooltipContent>
          </Tooltip>
        )}
      </span>
      {copyable && (
        <span>
          <Tooltip>
            <TooltipTrigger>
              <button
                className="hover:opacity-70 transition-opacity"
                onClick={() => navigator.clipboard.writeText(address)}
              >
                <i className="ri-file-copy-fill"></i>
              </button>
            </TooltipTrigger>
            <TooltipContent>Copy address</TooltipContent>
          </Tooltip>
        </span>
      )}
      {addToWallet && (
        <span>
          <Tooltip>
            <TooltipTrigger>
              <AddToWallet address={address} />
            </TooltipTrigger>
            <TooltipContent>Add to wallet</TooltipContent>
          </Tooltip>
        </span>
      )}
    </span>
  );
};
