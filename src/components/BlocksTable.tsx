import Title from '@/components/Title';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ethers } from 'ethers';

const BlocksTable: React.FC<{ blocks: ethers.Block[] }> = ({ blocks }) => {
  return (
    <>
      <Title>Blocks</Title>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Hash</TableCell>
              <TableCell>Transactions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blocks.map((block) => (
              <TableRow
                key={block.hash}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {block.number}
                </TableCell>
                <TableCell component="th" scope="row">
                  {block.hash}
                </TableCell>
                <TableCell component="th" scope="row">
                  {block.transactions.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BlocksTable;
