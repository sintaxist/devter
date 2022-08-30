import { colors } from 'styles/theme'

export default function Button({ children, onClick }) {
    return (
        <>
            <button onClick={onClick}>
                {children}
            </button>

            <style jsx>{`
                button{
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  border: 0;
                  background: ${colors.black};
                  color: ${colors.white};
                  border-radius: 100px;
                  font-size: 16px;
                  cursor: pointer;
                  padding: 13px 24px;
                  font-weight: 800;
                  transition: opacity .3s ease;
                }
                button > :global(svg){
                    transform: scale(1.2);
                }
                button:hover{
                    opacity: .7;
                }
            `}</style>
        </>
    )
}
