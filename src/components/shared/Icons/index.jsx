import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faChevronLeft,
  faHandHoldingDollar,
  faPiggyBank,
  faScaleBalanced,
  faReceipt,
  faWallet,
  faScaleUnbalanced,
  faFilePen,
  faEllipsis,
  faTrashCan,
  faList,
  faRectangleXmark,
  faGears,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";

export const AddFileIcon = (props) => (
  <FontAwesomeIcon icon={faFileCirclePlus} {...props} />
);

export const GoBackIcon = (props) => (
  <FontAwesomeIcon icon={faChevronLeft} {...props} />
);

export const IncomeIcon = (props) => (
  <FontAwesomeIcon icon={faHandHoldingDollar} {...props} />
);

export const CarryForwardIcon = (props) => (
  <FontAwesomeIcon icon={faPiggyBank} {...props} />
);

export const BalanceIcon = (props) => (
  <FontAwesomeIcon icon={faScaleBalanced} {...props} />
);

export const UnAllocatedIcon = (props) => (
  <FontAwesomeIcon icon={faReceipt} {...props} />
);

export const WalletIcon = (props) => (
  <FontAwesomeIcon icon={faWallet} {...props} />
);

export const RemainIcon = (props) => (
  <FontAwesomeIcon icon={faScaleUnbalanced} {...props} />
);

export const EditIcon = (props) => (
  <FontAwesomeIcon icon={faFilePen} {...props} />
);

export const DeleteIcon = (props) => (
  <FontAwesomeIcon icon={faTrashCan} {...props} />
);

export const ListIcon = (props) => <FontAwesomeIcon icon={faList} {...props} />;

export const EllipsisIcon = (props) => (
  <FontAwesomeIcon icon={faEllipsis} {...props} />
);

export const CloseIcon = (props) => (
  <FontAwesomeIcon icon={faRectangleXmark} {...props} />
);

export const SettingIcon = (props) => (
  <FontAwesomeIcon icon={faGears} {...props} />
);

export const FilePdfIcon = (props) => (
  <FontAwesomeIcon icon={faFilePdf} {...props} />
);